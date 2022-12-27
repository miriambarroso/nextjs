import axiosInstance from '@/utils/axios';

class CRUDService<T> {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async create(item: T) {
    const response = await axiosInstance.post(`${this.baseUrl}`, item);
    return response.data;
  }

  async get(id: number) {
    const response = await axiosInstance.get(`/${this.baseUrl}/${id}`);
    return response.data;
  }

  async getAll() {
    const response = await axiosInstance.get(`/${this.baseUrl}`);
    return response.data;
  }

  async update(item: T extends { id: number } ? T : any) {
    const response = await axiosInstance.put(
      `/${this.baseUrl}/${item.id}`,
      item,
    );
    return response.data;
  }

  async delete(id: number) {
    const response = await axiosInstance.delete(`/${this.baseUrl}/${id}`);
    return response.data;
  }
}

export default CRUDService;
