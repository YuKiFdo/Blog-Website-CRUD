<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::find($id);

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'created_at' => Carbon::parse($post->created_at)->format('Y-m-d'),
            'updated_at' => $post->updated_at,
            'user' => [
                'id' => $post->user->id,
                'name' => $post->user->name,
            ]
        ]);
    }

    public function authindex() {
        $posts = Post::where('user_id', Auth::id())->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        return response()->json($post, 201);
    }

    public function edit(Post $post)
    {
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->json(null, 204);
    }
}
