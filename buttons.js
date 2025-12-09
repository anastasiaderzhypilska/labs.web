import api from "./index";

export async function handleViewDetails(id) {
try {
    return {
    action: "navigate",
    path: `/item/${id}`,
    message: `Navigating to zoo ${id} details`
    };
} catch (error) {
    return {
    action: null,
    path: null,
    message: `Error handling view details: ${error.message}`
    };
}
}
