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
        $products = Product::with('category')->get();

        $inventory = $products->map(function ($product) {

            $stock = InventoryMovement::where(
                'product_id',
                $product->id
            )->sum('quantity');

            return [
                'id' => $product->id,
                'sku' => $product->sku,
                'name' => $product->name,
                'category' => $product->category,
                'price' => $product->price,

                'stock' => (int) $stock
            ];
        });

        return response()->json(
            $inventory
        );
    }
}
