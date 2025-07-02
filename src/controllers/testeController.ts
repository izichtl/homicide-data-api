import { Router } from "express";
import mongoose from "mongoose";

const testRouter = Router();

testRouter.get("/ping", async (req, res) => {
  const collections = await mongoose!.connection!.db!.listCollections().toArray();
  res.json({
    bancoConectado: mongoose!.connection!.db!.databaseName,
    collections: collections.map((c) => c.name),
  });
});

testRouter.get("/test-homicidios", async (req, res) => {
  try {
    const result = await mongoose!.connection!.db!
      .collection("homicidios_document")
      .find({})
      .limit(5)
      .toArray();

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao consultar collection", error: error.message });
  }
});

export default testRouter;