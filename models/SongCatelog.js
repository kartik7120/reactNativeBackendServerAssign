import mongoose from "mongoose";

const songCatelogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

const SongCatelog = mongoose.model("SongCatelog", songCatelogSchema);
export default SongCatelog;