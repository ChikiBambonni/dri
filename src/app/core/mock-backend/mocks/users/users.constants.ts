import { UserRole } from '@core/enums';
import { IUser } from '@core/interfaces';

const mockUserFirstNames: string[] = [
  'David',
  'Ben',
  'Vaush',
  'Lil',
  'Sara',
  'Alex',
  'Kate',
  'John',
];

const mockUserLastNames: string[] = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
];

const getRandomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getRandomArrayItem = <T>(array: T[]) => {
  const index = getRandomInteger(0, array.length);
  return array[index];
};

const getRandomEnumValue = <T>(enumeration: T): T[keyof T] => {
  const enumValues = Object.keys(enumeration)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};

const generateMockUsers = (count: number): IUser[] =>
  Array.from({ length: count }).map((_, index) => {
    const firstName = getRandomArrayItem(mockUserFirstNames);
    const lastName = getRandomArrayItem(mockUserLastNames);

    return {
      id: index + 1,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`,
      birthDate: getRandomDate(new Date(1970, 0, 1), new Date()),
      role: getRandomEnumValue(UserRole),
    };
  });

export const mockUsers: IUser[] = generateMockUsers(100);
