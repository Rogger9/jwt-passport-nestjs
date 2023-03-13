export interface ICommonRepository<T = unknown> {
  find<U>(term?: U): Promise<T[]>
  findOne(term: string): Promise<T>
  create(data: any): Promise<T>
  update(...args: any): Promise<T>
  delete(id: string): Promise<T[]>
}

export const ICommonRepositoryToken = Symbol('ICommonRepository')
