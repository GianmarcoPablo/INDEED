import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_DRIVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `Database connect ${db.connection.host}:${db.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectionDB