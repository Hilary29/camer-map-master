import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const votingData = req.body;
    console.log("Données reçues :", votingData);

    // Ajoutez ici la logique pour enregistrer les données dans une base de données
    res.status(200).json({ message: "Données enregistrées avec succès !" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
