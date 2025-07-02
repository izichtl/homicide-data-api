import { Router, Request, Response } from "express";
import { Homicide } from "../models/Homicides";


export const getHomicidesByYearAndLocation = async (req: Request, res: Response) => {
  try {
    const { ano, regiao, UF } = req.query as { [key: string]: string | undefined };

    const filter: Record<string, any> = {};

    // Filtro de ano (opcional)
    if (ano) {
      const yearNum = Number(ano);
      if (!Number.isInteger(yearNum)) {
        return res.status(400).json({ message: "Parâmetro 'ano' inválido" });
      }
      filter.ano = yearNum;
    }

    // Filtro de UF > prioridade sobre regiao
    if (UF) {
      filter.UF = UF.toUpperCase();
    } else if (regiao) {
      filter.regiao = regiao;
    }

    const projection = {
      _id: 0,
      UF: 1,
      nome_UF: 1,
      regiao: 1,
      ano: 1,
      taxa_uf: 1,
      PerCapitaUF: 1,
    };
    console.log("Filtros recebidos:", { ano, regiao, UF });
console.log("Query final MongoDB:", filter);

    const data = await Homicide.find(filter, projection).sort({ UF: 1, ano: 1 });
    console.log("Homicide data:", data);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: "Erro de servidor", error: error.message });
  }
};

