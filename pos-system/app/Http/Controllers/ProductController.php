<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'sku' => 'required|unique:products',
            'name' => 'required',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id'
        ]);

        $products = Product::create([
            'sku' => $request->sku,
            'name' => $request->name,
            'price' => $request->price,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'message' => 'Product Succesfully added',
            'data' => $products,
        ]);
    }

    public function index()
    {
        return response()->json(
            Product::with('category')->get()
        );
    }
}
