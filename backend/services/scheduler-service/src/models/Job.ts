import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface JobError {
  message: string;
  stack?: string;
  code?: string;
}

export interface JobAttributes {
  id: string;
  name: string;
  description: string | null;
  type: string;
  payload: Record<string, unknown> | null;
  runAt: Date | null;
  maxAttempts: number;
  attempts: number;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "DEAD_LETTER";
  error: JobError | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface JobCreationAttributes extends Optional<
  JobAttributes,
  | "id"
  | "attempts"
  | "status"
  | "error"
  | "completedAt"
  | "isActive"
  | "createdAt"
  | "updatedAt"
> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> {
  declare id: string;
  declare name: string;
  declare description: string | null;
  declare type: string;
  declare payload: Record<string, unknown> | null;
  declare runAt: Date | null;
  declare maxAttempts: number;
  declare attempts: number;
  declare status:
    | "PENDING"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED"
    | "DEAD_LETTER";
  declare error: JobError | null;
  declare completedAt: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare isActive: boolean;
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    runAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    maxAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "RUNNING",
        "COMPLETED",
        "FAILED",
        "DEAD_LETTER",
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },
    error: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "jobs",
    timestamps: true,
    underscored: true,
    indexes: [
      
    ],
  },
);
