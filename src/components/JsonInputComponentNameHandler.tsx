export function JsonInputComponentNameHandler<T>(entity: string){
    const newEntity = entity.toString();
    const entityParts = newEntity.split(".");
    const baseEntity = entityParts[0] as keyof T;
    const nestedProperty = entityParts[1];

    return {baseEntity,nestedProperty}
}