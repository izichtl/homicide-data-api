import mongoose, { Schema } from "mongoose";

/**
 * Interface que representa um documento da coleção homicidiosUFxPerCapita
 */
interface IHomicide {
  cod_pais: number;
  pais: string;
  cod_regiao: number;
  regiao: string;
  cod_uf: number;
  UF: string;
  nome_UF: string;
  ano: number;
  taxa_uf: number;
  PerCapitaUF: number;
}

/**
 * Esquema Mongoose para a coleção homicidiosUFxPerCapita
 * \nObs.: definimos o campo `collection` para usar a collection existente
 */
export const homicideSchema = new Schema<IHomicide>(
  {
    cod_pais: Number,
    pais: String,
    cod_regiao: Number,
    regiao: String,
    cod_uf: Number,
    UF: String,
    nome_UF: String,
    ano: Number,
    taxa_uf: Number,
    PerCapitaUF: Number,
  },
  { collection: "homicidios_document" }
);

/**
 * Índices recomendados para acelerar filtros de dashboard.
 * Crie-os uma única vez no MongoDB (ou via Mongoose no startup):
 *   db.homicidiosUFxPerCapita.createIndex({ ano: 1 })
 *   db.homicidiosUFxPerCapita.createIndex({ UF: 1 })
 *   db.homicidiosUFxPerCapita.createIndex({ regiao: 1 })
 */

export const Homicide = mongoose.models.Homicide || mongoose.model<IHomicide>("Homicide", homicideSchema);

