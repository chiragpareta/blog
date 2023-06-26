import BlogPost from "@/model/blogPost";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            const deletedPost = await BlogPost.findByIdAndDelete(id);
            res.status(200).json(deletedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}