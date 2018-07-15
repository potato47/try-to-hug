class GlobalInstance {
    public static readonly Instance: GlobalInstance = new GlobalInstance();

    private constructor() {}
}

export const G = GlobalInstance.Instance;