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

export const getTaxaHomicidiosPorRegiao = async (req: Request, res: Response) => {
  try {
    console.log("Iniciando consulta de taxas de homicídio por região");
    const pipeline1: any[] = [
  {
    $match: {
      regiao: { $in: ['Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste'] },
      taxa_uf: { $ne: null }
    }
  },
  {
    $group: {
      _id: { regiao: '$regiao', ano: '$ano' },
      media_taxa: { $avg: '$taxa_uf' }
    }
  },
  {
    $project: {
      _id: 0,
      regiao: '$_id.regiao',
      ano: '$_id.ano',
      taxa_homicidio: { $round: ['$media_taxa', 2] }
    }
  },
  {
    $sort: {
      regiao: 1,
      ano: 1
    }
  },
  {
    $group: {
      _id: '$regiao',
      dados: {
        $push: {
          ano: '$ano',
          taxa_homicidio: '$taxa_homicidio'
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      regiao: '$_id',
      dados: 1
    }
  }
];

    const resultado = await Homicide.aggregate(pipeline1).exec();
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao consultar taxas de homicídio por região',
      error: error.message
    });
  }
};
