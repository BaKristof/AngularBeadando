//import { Server } from "socket.io";
import { AppDataSource } from "./data-source"
import { Adatok } from "./entity/Adatok"

export function configureSocketServer(httpServer: any) {
    const io = require("socket.io")(httpServer, {
      cors: {origin : '*'}
    });

    io.on("connection", async (socket) => {
      console.log("New user connected!");
      
      const adatokRepository = AppDataSource.getRepository(Adatok);
      const intervalID = setInterval(async () => {
        
       // console.log("Initializing socket server...");
          try {
            const query = adatokRepository.createQueryBuilder("adatok")
              .select("*")
              .where("adatok.Felvet IN (SELECT max(Felvet) FROM adatok GROUP BY Komponens)");
    
            const results = await query.execute();
            io.emit("message", results);
          } catch (error) {
            console.error("Error getting data from database:", error);
          }
        }, 1000);
    
        socket.on("disconnect", () => {
          console.log("User disconnected!");
          clearInterval(intervalID);
        });
      });
}
