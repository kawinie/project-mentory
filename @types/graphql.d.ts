// graphql.d.ts file
declare module "*.graphql" {
    import { DocumentNode, DocumentNode } from "graphql";

    const value: DocumentNode;
    export = value;
}

declare module "*.gql" {
    const value: DocumentNode;
    export = value;
}
