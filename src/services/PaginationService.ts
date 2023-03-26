import { IPagination } from '@/interfaces/pagination';
import axiosInstance from '@/utils/axios';

class PaginationService<T> {
  public count: number;
  public next: string | null;
  public previous: string | null;
  public results: T[];

  constructor(pagination: IPagination<T>) {
    this.count = pagination.count;
    this.next = pagination.next;
    this.previous = pagination.previous;
    this.results = pagination.results;
  }

  public hasNext(): boolean {
    return !!this.next;
  }

  public hasPrevious(): boolean {
    return !!this.previous;
  }

  public fetchNext(): Promise<PaginationService<T>> {
    if (!this.hasNext()) {
      throw new Error('No more pages to fetch');
    }

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(this.next)
        .then(({ data }) => resolve(new PaginationService(data)))
        .catch(reject);
    });
  }

  public fetchPrevious(): Promise<PaginationService<T>> {
    if (!this.hasPrevious()) {
      throw new Error('No more pages to fetch');
    }

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(this.previous)
        .then(({ data }) => resolve(new PaginationService(data)))
        .catch(reject);
    });
  }
}

export default PaginationService;
