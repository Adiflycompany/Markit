import { Request, Response } from "express";
import User from "../models/userModel";
import Presence from "../models/presenceModel";


export const getAllUsers = async (req: Request, res: Response) => {
  res.send('Liste des utilisateurs');
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const getAllPresences = async (req: Request, res: Response) => {
  const presences = await Presence.find().populate("user").populate("event");
  res.json(presences);
};

