'use strict';
const { createResourceContext } = require("@use-resource/context");

describe('createResourceContext', () => {
    let contextValues;
    beforeEach(() => {
        contextValues = createResourceContext("test")._currentValue;
    });
    it('should initialize data', () => {
        expect(contextValues.data).toBeDefined();
        expect(contextValues.data).toBeInstanceOf(Array);
    });
    it('should initialize loadings', () => {
        expect(contextValues.loadings).toBeDefined();
        expect(contextValues.loadings.fetch).toBeDefined();
        expect(contextValues.loadings.fetch).toEqual(false);

        expect(contextValues.loadings.create).toBeDefined();
        expect(contextValues.loadings.create).toEqual(false);


        expect(contextValues.loadings.edit).toBeDefined();
        expect(contextValues.loadings.edit).toEqual(false);


        expect(contextValues.loadings.fetchOne).toBeDefined();
        expect(contextValues.loadings.fetchOne).toEqual(false);


        expect(contextValues.loadings.delete).toBeDefined();
        expect(contextValues.loadings.delete).toEqual(false);


        expect(contextValues.loadings.deleteMany).toBeDefined();
        expect(contextValues.loadings.deleteMany).toEqual(false);


        expect(contextValues.loadings.byId).toBeDefined();
        expect(contextValues.loadings.byId).toBeInstanceOf(Function);
    });
    it('should initialize errors', () => {
        expect(contextValues.errors).toBeDefined();
        expect(contextValues.errors.fetch).toBeDefined();
        expect(contextValues.errors.fetch).toEqual(null);

        expect(contextValues.errors.create).toBeDefined();
        expect(contextValues.errors.create).toEqual(null);


        expect(contextValues.errors.edit).toBeDefined();
        expect(contextValues.errors.edit).toEqual(null);


        expect(contextValues.errors.fetchOne).toBeDefined();
        expect(contextValues.errors.fetchOne).toEqual(null);


        expect(contextValues.errors.delete).toBeDefined();
        expect(contextValues.errors.delete).toEqual(null);


        expect(contextValues.errors.deleteMany).toBeDefined();
        expect(contextValues.errors.deleteMany).toEqual(null);
    });
    it('should initialize status', () => {
        expect(contextValues.status).toBeDefined();
        expect(contextValues.status.fetch).toBeDefined();
        expect(contextValues.status.fetch).toEqual(null);

        expect(contextValues.status.create).toBeDefined();
        expect(contextValues.status.create).toEqual(null);


        expect(contextValues.status.edit).toBeDefined();
        expect(contextValues.status.edit).toEqual(null);


        expect(contextValues.status.fetchOne).toBeDefined();
        expect(contextValues.status.fetchOne).toEqual(null);


        expect(contextValues.status.delete).toBeDefined();
        expect(contextValues.status.delete).toEqual(null);


        expect(contextValues.status.deleteMany).toBeDefined();
        expect(contextValues.status.deleteMany).toEqual(null);
    });
    it('should initialize mutationReseter', () => {
        expect(contextValues.mutationReseter).toBeDefined();
        expect(contextValues.mutationReseter.fetch).toBeDefined();
        expect(contextValues.mutationReseter.fetch).toBeInstanceOf(Function);

        expect(contextValues.mutationReseter.create).toBeDefined();
        expect(contextValues.mutationReseter.create).toBeInstanceOf(Function);


        expect(contextValues.mutationReseter.edit).toBeDefined();
        expect(contextValues.mutationReseter.edit).toBeInstanceOf(Function);


        expect(contextValues.mutationReseter.fetchOne).toBeDefined();
        expect(contextValues.mutationReseter.fetchOne).toBeInstanceOf(Function);


        expect(contextValues.mutationReseter.delete).toBeDefined();
        expect(contextValues.mutationReseter.delete).toBeInstanceOf(Function);


        expect(contextValues.mutationReseter.deleteMany).toBeDefined();
        expect(contextValues.mutationReseter.deleteMany).toBeInstanceOf(Function);
    });
    it('should initialize methods', () => {
        expect(contextValues.methods).toBeDefined();

        expect(contextValues.methods.refetch).toBeDefined();
        expect(contextValues.methods.refetch).toBeInstanceOf(Function);

        expect(contextValues.methods.create).toBeDefined();
        expect(contextValues.methods.create).toBeInstanceOf(Function);


        expect(contextValues.methods.edit).toBeDefined();
        expect(contextValues.methods.edit).toBeInstanceOf(Function);


        expect(contextValues.methods.fetchOne).toBeDefined();
        expect(contextValues.methods.fetchOne).toBeInstanceOf(Function);


        expect(contextValues.methods.delete).toBeDefined();
        expect(contextValues.methods.delete).toBeInstanceOf(Function);


        expect(contextValues.methods.deleteMany).toBeDefined();
        expect(contextValues.methods.deleteMany).toBeInstanceOf(Function);

        expect(contextValues.methods.getById).toBeDefined();
        expect(contextValues.methods.getById).toBeInstanceOf(Function);
    });
    it('should handle custom properties', () => {
        expect(contextValues.loadings.customPropOne).toBeUndefined();
        expect(contextValues.errors.customPropOne).toBeUndefined();
        expect(contextValues.status.customPropOne).toBeUndefined();
        expect(contextValues.mutationReseter.customPropOne).toBeUndefined();
        expect(contextValues.methods.customPropOne).toBeUndefined();

        contextValues = createResourceContext("test", ["customPropOne", "customPropTwo"])._currentValue;

        expect(contextValues.loadings.customPropOne).toBeDefined();
        expect(contextValues.loadings.customPropOne).toEqual(false);
        expect(contextValues.errors.customPropOne).toBeDefined();
        expect(contextValues.errors.customPropOne).toEqual(null);
        expect(contextValues.status.customPropOne).toBeDefined();
        expect(contextValues.status.customPropOne).toEqual(null);
        expect(contextValues.mutationReseter.customPropOne).toBeDefined();
        expect(contextValues.mutationReseter.customPropOne).toBeInstanceOf(Function);
        expect(contextValues.methods.customPropOne).toBeDefined();
        expect(contextValues.methods.customPropOne).toBeInstanceOf(Function);

        expect(contextValues.loadings.customPropTwo).toBeDefined();
        expect(contextValues.loadings.customPropTwo).toEqual(false);
        expect(contextValues.errors.customPropTwo).toBeDefined();
        expect(contextValues.errors.customPropTwo).toEqual(null);
        expect(contextValues.status.customPropTwo).toBeDefined();
        expect(contextValues.status.customPropTwo).toEqual(null);
        expect(contextValues.mutationReseter.customPropTwo).toBeDefined();
        expect(contextValues.mutationReseter.customPropTwo).toBeInstanceOf(Function);
        expect(contextValues.methods.customPropTwo).toBeDefined();
        expect(contextValues.methods.customPropTwo).toBeInstanceOf(Function);

    });
});
