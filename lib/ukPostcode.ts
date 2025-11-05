/**
 * uk-postcode
 * Parse and validate UK postcodes
 * @author Lovell Fuller
 *
 * This code is distributed under the Apache License Version 2.0, the terms of
 * which may be found at http://www.apache.org/licenses/LICENSE-2.0.html
 */

/**
 * An error relating to postcode parsing or validation
 */
export class PostcodeError extends Error {}

/**
 * Postcode object
 */
export class Postcode {
  outward: string | null;
  inward: string | null;

  constructor() {
    this.outward = null;
    this.inward = null;
  }

  /**
   * Creates a Postcode from a string. Doesn't in itself validate the postcode.
   * You can use the methods isValid() and isComplete() to check validity.
   */
  static unvalidatedFromString(postcodeAsString: string): Postcode {
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

  /**
   * Creates a Postcode from the outward part only. Throws a PostcodeError if
   * the outward part is invalid.
   */
  static fromOutward(outward: string): Postcode {
    const postcode = Postcode.unvalidatedFromString(outward);
    if (!postcode.isPartial()) {
      throw new PostcodeError("Postcode contains inward part");
    }
    return postcode;
  }

  /**
   * Creates a Postcode from a complete postcode string. Throws a PostcodeError if
   * the postcode is invalid.
   */
  static fromComplete(postcode: string): Postcode {
    const fullPostcode = Postcode.unvalidatedFromString(postcode);
    if (!fullPostcode.isComplete()) {
      throw new PostcodeError("Invalid complete postcode");
    }
    return fullPostcode;
  }

  /**
   * Creates a Postcode from a outward and/or inward part. Throws a PostcodeError if
   * either part is invalid.
   */
  static fromString(postcode: string): Postcode {
    const fullPostcode = Postcode.unvalidatedFromString(postcode);
    if (!fullPostcode.isValid()) {
      throw new PostcodeError("Invalid postcode");
    }
    return fullPostcode;
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

/** Factory method to call unvalidatedFromString for backwards compatibility. */
export function fromString(postcodeAsString: string): Postcode {
  return Postcode.unvalidatedFromString(postcodeAsString);
}
