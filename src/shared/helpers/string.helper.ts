export function toCamelCase(input: string): string {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
  }
  
  export function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .replace(/(^|\s)(\w)/g, (_, space, char) => space + char.toUpperCase());
  }
  
  // Extend the global String interface
  declare global {
    interface String {
      toCamelCase(): string;
      toTitleCase(): string;
    }
  }

  String.prototype.toCamelCase = function(this: string): string {
    return toCamelCase(this);
  };
  
  String.prototype.toTitleCase = function(this: string): string {
    return toTitleCase(this);
  };