import { Exercise, MuscleGroup, Training, WorkoutSheet } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

type RequestResponse = {
  success: boolean;
  statusCode: number;
  statusText: string;
  data: Exercise[] | MuscleGroup[] | Training[] | WorkoutSheet[];
};

enum Code {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  InternalErrorServer = 500,
}

enum Text {
  BadRequest = 'Bad request.',
  Created = 'Resource created.',
  Found = 'Resource found.',
  Updated = 'Resource updated.',
  NotCreated = 'Fail to create resource.',
  NotFound = 'Fail to find resource.',
  NotUpdated = 'Fail to update resource.',
}

export function errorOnCreate(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotCreated} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnFind(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotFound} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnUpdate(error: PrismaClientUnknownRequestError) {
  return {
    success: false,
    statusCode: Code.InternalErrorServer,
    statusText: `${Text.NotUpdated} ${error.message}`,
    data: [],
  } as RequestResponse;
}

export function errorOnValidate(error: string) {
  return {
    success: false,
    statusCode: Code.BadRequest,
    statusText: `${Text.BadRequest} ${error}`,
    data: [],
  } as RequestResponse;
}

export function successOnCreate(data: Exercise | Training | WorkoutSheet) {
  return {
    success: true,
    statusCode: Code.Created,
    statusText: Text.Created,
    data: [data],
  } as RequestResponse;
}

export function successOnFindOne(data: Exercise | MuscleGroup | Training | WorkoutSheet) {
  return {
    success: true,
    statusCode: Code.Ok,
    statusText: Text.Found,
    data: [data],
  } as RequestResponse;
}

export function successOnFindMany(
  data: Exercise[] | MuscleGroup[] | Training[] | WorkoutSheet[]
) {
  return {
    success: true,
    statusCode: Code.Ok,
    statusText: Text.Found,
    data,
  } as RequestResponse;
}

export function successOnUpdate(data: Exercise | Training | WorkoutSheet) {
  return {
    success: true,
    statusCode: Code.NoContent,
    statusText: Text.Updated,
    data: [data],
  } as RequestResponse;
}
