import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

function getPercentage(value) {
  const total = 200.0;
  if (typeof value !== "number" || isNaN(value)) return null;
  return (value / total) * 100;
}

app.post("/new-silo", async (req, res) => {
  const { silo_name } = req.body;
  try {
    const newSilo = await prisma.silo.create({
      data: {
        silo_name,
      },
    });

    // console.log("Novo silo criado:", newSilo);

    res.status(201).json({
      message: "Novo silo criado com sucesso.",
      silo_name: newSilo.silo_name,
      id: newSilo.id,
    });
  } catch (error) {
    console.error("Erro ao criar o silo:", error);
    res.status(500).json({ erro: "Erro ao criar o silo no banco de dados." });
  }
});

app.post("/sensor", async (req, res) => {
  const { sensor_value, id } = req.body;

  try {
    const newReading = await prisma.silo.update({
      where: { id: id },
      data: {
        sensor_value: sensor_value,
        dt_register: new Date(),
      },
    });

    // console.log("Leitura salva no banco:", newReading);

    res.status(201).json({
      message: "Leitura salva com sucesso.",
      id: newReading.id,
      silo_name: newReading.silo_name,
      sensor_value: sensor_value,
      dt_register: newReading.dt_register,
    });
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
    res.status(500).json({ erro: "Erro ao salvar os dados no banco de dados." });
  }
});

app.get("/silos", async (req, res) => {
  try {

    const silos = await prisma.silo.findMany();
    const resultadoFormatado = silos.map((silo) => ({
      silo_name: silo.silo_name,
      sensor_value: silo.sensor_value,
      percentage_value: getPercentage(silo.sensor_value),
      dt_register: silo.dt_register,
      dt_consulting: new Date(),
    }));

    res.json(resultadoFormatado);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    res.status(500).json({ erro: "Erro ao buscar os dados servidor." });
  }
});

app.get("/", async (req, res) => {
  res.status(200).send('<h1 style="text-align: center">Api GM Online, 2025!</h1>');
});

app.listen(PORT, () => console.log(`API funcionando na porta ${PORT}`));
