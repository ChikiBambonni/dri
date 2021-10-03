import { IDictionary } from './../../../interfaces/dictionary.interfaces';
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
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

const getRandomEnumValue = <T>(enumeration: IDictionary<T>): T => {
  const keys = Object.keys(enumeration);
  const randomIndex = getRandomInteger(0, keys.length - 1);
  return enumeration[keys[randomIndex]];
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

export const mockUsers: IUser[] = generateMockUsers(500);
