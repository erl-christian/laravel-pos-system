<?php

namespace App\Http\Controllers;

use App\Models\InventoryMovement;
use Illuminate\Http\Request;
use App\Models\Product;

class InventoryController extends Controller
{
    //
    public function stockIn(Request $request)
    {
        $request->validate([
            'product_id'=>'required|exists:products,id',
            'quantity'=>'required|integer|min:1',
        ]);

        $movement = InventoryMovement::create([
            'product_id' => $request->product_id,
            'type' => 'stock_in',
            'quantity' => $request->quantity,
            'remarks' => $request->remarks,
        ]);

        return response()->json([
            'message' => "Stock Added Succesfully",
            'data' => $movement
        ]);
    }

    public function inventory()
    {
        // 1. Fetch products with their category
        // 2. Efficiently calculate sum of stock_in and stock_out inside the database
        $products = Product::with('category')
            ->withSum(['movements as total_in' => function ($query) {
                $query->where('type', 'stock_in');
            }], 'quantity')
            ->withSum(['movements as total_out' => function ($query) {
                $query->where('type', 'stock_out');
            }], 'quantity')
            ->get();

        // Map the data for your React frontend
        $inventory = $products->map(function ($product) {
            // Treat null sums as 0
            $totalIn = $product->total_in ?? 0;
            $totalOut = $product->total_out ?? 0;

            return [
                'id'       => $product->id,
                'sku'      => $product->sku,
                'name'     => $product->name,
                'category' => $product->category,
                'price'    => $product->price,
                'stock'    => (int) ($totalIn - $totalOut) // Math remains accurate forever!
            ];
        });

        return response()->json($inventory);
    }

    public function history()
    {
        return response()->json(
            InventoryMovement::with('product')->latest()->get()
        );
    }
}
