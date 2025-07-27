import mongoose from "mongoose";
import Resolver from "./Resolver";

export default class CacheResolver extends Resolver {
    regex: RegExp;

    constructor(init: Partial<CacheResolver>) {
        super(init);
        this.regex = init.regex || new RegExp("");
    }
}