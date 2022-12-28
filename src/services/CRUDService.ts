import axiosInstance from '@/utils/axios';

class CRUDService<T> {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(item: T) {
    const { data } = await axiosInstance.post(`${this.baseUrl}`, item);
    return data;
  }

  async get(id: number) {
    const { data } = await axiosInstance.get(`/${this.baseUrl}/${id}`);
    return data;
  }

  async getAll() {
    const { data } = await axiosInstance.get(`/${this.baseUrl}`);
    return data;
  }

  async update(item: T extends { id: number } ? T : any) {
    const { data } = await axiosInstance.put(
      `/${this.baseUrl}/${item.id}`,
      item,
    );
    return data;
  }

  async delete(id: number) {
    const { data } = await axiosInstance.delete(`/${this.baseUrl}/${id}`);
    return data;
  }
}

export default CRUDService;
