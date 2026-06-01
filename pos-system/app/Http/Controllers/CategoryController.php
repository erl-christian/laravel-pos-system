<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories'
        ]);

        $category = Category::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message'=>"Category Created Succesfully!"
        ]);


    }

    public function index()
    {
        return response()->json(
            Category::all()
        );
    }
}
