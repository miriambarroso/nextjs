import axiosInstance from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { omitBy } from "lodash";
import { IPagination } from "@/interfaces/pagination";

class CRLUDService<C, R, L, U, D> {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  cleanUp(item) {
    if (item instanceof FormData) {
      return item;
    }
    return omitBy(item, (v) => !v);
  }

  async create(item: C | FormData, config?: AxiosRequestConfig): Promise<R> {
    const cleanedUp = this.cleanUp(item);
    const { data } = await axiosInstance.post(`${this.baseUrl}`, cleanedUp, {
      headers: {
        "Content-Type":
          item instanceof FormData ? "multipart/form-data" : "application/json"
      },
      ...config
    });
    return data;
  }

  async get(id: number, config?: AxiosRequestConfig): Promise<R> {
    const { data } = await axiosInstance.get(`/${this.baseUrl}/${id}`, config);
    return data;
  }

  async getAll(
    query?: any,
    config?: AxiosRequestConfig
  ): Promise<IPagination<L>> {
    const { data } = await axiosInstance.get(`/${this.baseUrl}`, {
      params: query,
      ...config
    });
    return data;
  }

  async update(
    item: U extends { id: number } ? U : any | FormData,
    id?: number,
    config?: AxiosRequestConfig
  ): Promise<U> {
    const cleanedUp = this.cleanUp(item);
    const { data } = await axiosInstance.put(
      `/${this.baseUrl}/${id ?? item.id}`,
      cleanedUp,
      {
        headers: {
          "Content-Type":
            item instanceof FormData
              ? "multipart/form-data"
              : "application/json"
        },
        ...config
      }
    );
    return data;
  }

  async partialUpdate(
    item: U extends { id: number } ? U : any | FormData,
    id?: number,
    config?: AxiosRequestConfig
  ): Promise<U> {
    const cleanedUp = this.cleanUp(item);
    const { data } = await axiosInstance.patch(
      `/${this.baseUrl}/${id ?? item.id}`,
      cleanedUp,
      {
        headers: {
          "Content-Type":
            item instanceof FormData
              ? "multipart/form-data"
              : "application/json"
        },
        ...config
      }
    );
    return data;
  }

  async delete(id: number, config?: AxiosRequestConfig): Promise<D> {
    const { data } = await axiosInstance.delete(
      `/${this.baseUrl}/${id}`,
      config
    );
    return data;
  }
}

export default CRLUDService;
