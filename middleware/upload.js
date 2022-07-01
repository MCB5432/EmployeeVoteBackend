const multer = require("multer")
const gridfsStorage = require("multer-gridfs-storage")

const storage = new gridfsStorage.GridFsStorage({
    url: "mongodb+srv://ruby:ruby@ruby.prxjvst.mongodb.net/?retryWrites=true&w=majority",
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.name}`;
            return filename
        }
    }

}
)