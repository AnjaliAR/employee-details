export class employee {
    name?: string;
    product?: number;
    editable?: boolean;
    constructor(
      name: string = "",
      product: number = 0,
      editable: boolean = false
    ) {
      this.name = name;
      this.product = product;
      this.editable = editable;
    }
  }