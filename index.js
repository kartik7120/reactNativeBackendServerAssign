import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import Song from "./models/Song.js";
import SongCatelog from "./models/SongCatelog.js";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error occured while connecting to mongoDB", err);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/songs", async (req, res) => {

    try {
        const songs = await Song.find({});
        res.json(songs);
    } catch (error) {
        res.status(500).send("Error occured while fetching songs");        
    }
});

app.post("/songs", async (req, res) => {

    try {
        const song1 = new Song({
            artist: "Artist 1",
            duration: "3:30",
            searchTitle: "song1",
            title: "Song 1"
        })
    
        const song2 = new Song({
            artist: "Artist 2",
            duration: "4:00",
            searchTitle: "song2",
            title: "Song 2"
        })
    
        const song3 = new Song({
            artist: "Artist 3",
            duration: "4:00",
            searchTitle: "song3",
            title: "Song 3"
        })
    
        const song4 = new Song({
            artist: "Artist 4",
            duration: "4:00",
            searchTitle: "song4",
            title: "Song 4"
        })
    
        const song5 = new Song({
            artist: "Artist 5",
            duration: "4:00",
            searchTitle: "song5",
            title: "Song 5"
        })
    
        await song1.save();
        await song2.save();
        await song3.save();
        await song4.save();
        await song5.save();
    
        res.send("Songs added successfully");
    } catch (error) {
        res.status(500).send("Error occured while adding songs");
    }
    
})

app.post("/songLists", async (req, res) => {
    try {
        const songs = await Song.find({});

        const songList = new SongCatelog({
            name: "Top 3 Happy Songs",
            songs: [
                songs[0]._id,
                songs[1]._id,
                songs[2]._id
            ]
        })

        await songList.save();

        const songList2 = new SongCatelog({
            name: "Top 2 Sad Songs",
            songs: [
                songs[3]._id,
                songs[4]._id
            ]
        })

        await songList2.save();

        const songList3 = new SongCatelog({
            name: "Top 3 Classical Songs",
            songs: [
                songs[2]._id,
                songs[3]._id,
                songs[4]._id
            ]
        })

        await songList3.save();

        const songList4 = new SongCatelog({
            name: "Top 2 Pop Songs",
            songs: [
                songs[0]._id,
                songs[1]._id
            ]
        })


        await songList4.save();

        const songList5 = new SongCatelog({
            name: "Top 3 Rock Songs",
            songs: [
                songs[2]._id,
                songs[3]._id,
                songs[4]._id
            ]
        })

        await songList5.save();

        res.send("Song lists added successfully");
    } catch (error) {
        res.status(500).send("Error occured while adding song lists");
    }

})

app.get("/songLists", async (req, res) => {
    try {
        const lists = await SongCatelog.find({})
        res.json(lists);
    } catch (error) {
        res.status(500).send("Error occured while fetching song lists");
    }
})

app.get("/songLists/:id", async (req, res) => {
    try {
        const list = await SongCatelog.findById(req.params.id).populate("songs");
        res.json(list);
    } catch (error) {
        res.status(500).send("Error occured while fetching song list");
    }
})

app.get("/songListsWithSongs", async (req, res) => {

    try {
        const lists = await SongCatelog.find({}).populate("songs");
        res.json(lists);
    } catch (error) {
        res.status(500).send("Error occured while fetching song lists with songs");
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});