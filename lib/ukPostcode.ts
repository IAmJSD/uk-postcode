/**
 * uk-postcode
 * Parse and validate UK postcodes
 * @author Lovell Fuller
 *
 * This code is distributed under the Apache License Version 2.0, the terms of
 * which may be found at http://www.apache.org/licenses/LICENSE-2.0.html
 */

/**
 * Postcode object
 */
class Postcode {
  outward: string | null;
  inward: string | null;

  constructor() {
    this.outward = null;
    this.inward = null;
  }

  /**
   * Does this postcode have valid outward part?
   */
  isValid(): boolean {
    return this.outward !== null;
  }

  /**
   * Does this postcode have valid outward and inward parts?
   */
  isComplete(): boolean {
    return this.outward !== null && this.inward !== null;
  }

  /**
   * Does this postcode have a valid outward and no inward part?
   */
  isPartial(): boolean {
    return this.outward !== null && this.inward === null;
  }

  /**
   * Format postcode with/without a space between the outward and inward portions
   */
  toString(): string {
    let formatted = "";
    if (this.isValid()) {
      formatted = this.outward as string;
      if (this.isComplete()) {
        formatted = formatted + " " + (this.inward as string);
      }
    }
    return formatted;
  }
}

/** Export factory method */
export function fromString(postcodeAsString: string): Postcode {
  let postcode = new Postcode();
  if (typeof postcodeAsString === "string") {
    let clean = postcodeAsString.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.match(/^[A-Z]{1,2}[0-9R][0-9A-Z]?[0-9][ABD-HJLNP-UW-Z]{2}$/)) {
      postcode.outward = clean.substring(0, clean.length - 3);
      postcode.inward = clean.substring(clean.length - 3);
    } else if (clean.match(/^[A-Z]{1,2}[0-9][0-9A-Z]?$/)) {
      postcode.outward = clean;
    }
  }
  return postcode;
}
