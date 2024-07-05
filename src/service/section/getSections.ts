import sections from "../../../data/section.json";
import { Section } from "../../model/data/Section";

async function getSections(): Promise<Section[]> {
    return sections as Section[];
}

export default getSections;
