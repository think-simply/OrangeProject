import { APIRequestContext, expect } from "@playwright/test";

export class SubUnitService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // Method to list all subunits
  async listAllSubUnits(): Promise<any[]> {
    const response = await this.apiContext.get(
      `${process.env.SUBUNIT_API_URL}?mode=tree`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(200); // Verify response status
    const responseBody = await response.json();
    return responseBody.data;
  }

  // Method to create a subunit
  async createSubUnit(unitId: string, name: string, description: string) {
    const payload = {
      unitId: unitId,
      name: name,
      description: description,
      parentId: 1, // Always use 1 as the parentId
    };

    console.log("Creating subunit with payload:", payload);

    const response = await this.apiContext.post(
      `${process.env.SUBUNIT_API_URL}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      }
    );

    if (response.status() !== 200) {
      console.error(`Failed to create subunit. Status: ${response.status()}`);
      console.error(`Response: ${await response.text()}`);
      throw new Error(
        `Subunit creation failed with status: ${response.status()}`
      );
    }

    const responseBody = await response.json();

    console.log(`Subunit created successfully:`, responseBody);

    // Extracting the important fields from the response
    const subUnitData = {
      id: responseBody.data.id,
      name: responseBody.data.name,
      unitId: responseBody.data.unitId,
      description: responseBody.data.description,
      level: responseBody.data.level,
      left: responseBody.data.left,
      right: responseBody.data.right,
    };

    console.log(`Parsed Subunit Data:`, subUnitData);
    return subUnitData;
  }
  // Method to update a subunit
  // Method to update a subunit
  async updateSubUnit(
    id: number,
    unitId: string,
    name: string,
    description: string
  ) {
    const payload = {
      unitId: unitId,
      name: name,
      description: description,
      parentId: 1, // Assuming parentId remains fixed
    };

    console.log(`Updating subunit with ID ${id} and payload:`, payload);

    const response = await this.apiContext.put(
      `${process.env.SUBUNIT_API_URL}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      }
    );

    if (response.status() !== 200) {
      console.error(`Failed to update subunit. Status: ${response.status()}`);
      console.error(`Response: ${await response.text()}`);
      throw new Error(
        `Subunit update failed with status: ${response.status()}`
      );
    }

    const responseBody = await response.json();

    console.log(`Subunit updated successfully:`, responseBody);

    // Extracting the updated fields from the response
    const updatedSubUnitData = {
      id: responseBody.data.id,
      name: responseBody.data.name,
      unitId: responseBody.data.unitId,
      description: responseBody.data.description,
      level: responseBody.data.level,
      left: responseBody.data.left,
      right: responseBody.data.right,
    };

    console.log(`Parsed Updated Subunit Data:`, updatedSubUnitData);

    return updatedSubUnitData;
  }

  // Method to delete a subunit by ID
  async deleteSubUnit(subUnitId: number): Promise<void> {
    const response = await this.apiContext.delete(
      `${process.env.SUBUNIT_API_URL}/${subUnitId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(200); // Verify successful deletion
  }

  async deleteASubUnitsByName(subUnitName: string) {
    // Fetch all subunits
    const subUnits = await this.listAllSubUnits();

    if (!subUnits || subUnits.length === 0) {
      console.log("No subunits found to delete.");
      return;
    }

    let found = false;

    for (const subUnit of subUnits) {
      // Check for children at level 1
      if (subUnit.children && subUnit.children.length > 0) {
        const level1SubUnits = subUnit.children.filter(
          (child) => child.level === 1 && child.name === subUnitName
        );

        for (const level1SubUnit of level1SubUnits) {
          console.log(
            `Deleting subunit with ID ${level1SubUnit.id} and name ${level1SubUnit.name}`
          );
          await this.deleteSubUnit(level1SubUnit.id);
          console.log(`Subunit deleted: ${level1SubUnit.name}`);
          found = true;
        }
      }
    }

  }

  async deleteAllLevel1SubUnits() {
    const subUnits = await this.listAllSubUnits();

    if (!subUnits || subUnits.length === 0) {
      return;
    }

    for (const subUnit of subUnits) {
      // Check for children at level 1
      if (subUnit.children && subUnit.children.length > 0) {
        const level1SubUnits = subUnit.children.filter(
          (child) => child.level === 1
        );

        for (const level1SubUnit of level1SubUnits) {
          console.log(level1SubUnit.id);
          await this.deleteSubUnit(level1SubUnit.id);
        }
      }
    }
  }
}
