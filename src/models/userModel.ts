import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface pour les propriétés d'un User
export interface IUser {
  name: string;
  email: string;
  password: string;
  entreprise: string;
  role: "admin" | "user";
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Interface pour le document Mongo (retourné par Mongoose)
export interface IUserDocument extends Document, IUser {}

// Interface pour le modèle statique (ex: User.findOne)
export interface IUserModel extends Model<IUserDocument> {}

// Schéma Mongoose
const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    entreprise: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// Méthode d'instance : comparer mot de passe
userSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword: string
): Promise<boolean> {
  try {
    console.log("🔍 Entered password:", enteredPassword);
    console.log("🔑 Hashed password in DB:", this.password);
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("❌ Erreur lors de la comparaison des mots de passe :", error);
    return false;
  }
};

// Hachage du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    console.log("🔒 Hachage du mot de passe...");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("✅ Mot de passe haché :", this.password);
    next();
  } catch (error) {
    console.error("❌ Erreur lors du hachage du mot de passe :", error);
    next(error as mongoose.CallbackError);
  }
});

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;