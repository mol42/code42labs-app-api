class GenericApiResponse {
  status: string;
  data: any;
  message: string;
  
  constructor() {
    this.status = "ok";
    this.data = {};
    this.message = "";
  }

  fail(errData = null) {
    this.data = errData;
    this.status = "fail";
    this.message = "fail";
    return this;
  }

  failJSON(errData = null) {
    return this.fail(errData).toJSON();
  }

  failJSONString(errData = null) {
    return JSON.stringify(this.fail(errData).toJSON());
  }

  ok(data) {
    this.status = "ok";
    this.message = null;
    this.data = data;
    return this;
  }

  okJSON(data) {
    return this.ok(data).toJSON();
  }

  okJSONString(data) {
    return JSON.stringify(this.ok(data).toJSON());
  }

  toJSON() {
    let self = this;
    return {
      status: self.status,
      message: self.message,
      data: self.data
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

export default GenericApiResponse;
