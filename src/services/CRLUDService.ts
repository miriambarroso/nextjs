import axiosInstance from '@/utils/axios';

class CRLUDService<C, R, L, U, D> {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(item: C): Promise<R> {
    const { data } = await axiosInstance.post(`${this.baseUrl}`, item);
    return data;
  }

  async get(id: number): Promise<R> {
    const { data } = await axiosInstance.get(`/${this.baseUrl}/${id}`);
    return data;
  }

  async getAll(query?: any): Promise<{
    count: number;
    next: number;
    previous: number;
    results: L[];
  }> {
    const { data } = await axiosInstance.get(`/${this.baseUrl}`, {
      params: query,
    });
    return data;
  }

  async update(item: U extends { id: number } ? U : any): Promise<U> {
    const { data } = await axiosInstance.put(
      `/${this.baseUrl}/${item.id}`,
      item,
    );
    return data;
  }

  async delete(id: number): Promise<D> {
    const { data } = await axiosInstance.delete(`/${this.baseUrl}/${id}`);
    return data;
  }
}

export default CRLUDService;
