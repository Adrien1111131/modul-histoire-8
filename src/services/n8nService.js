import axios from 'axios';

class N8nService {
    constructor() {
        this.baseURL = import.meta.env.VITE_N8N_URL || 'http://localhost:5678';
        this.apiKey = import.meta.env.VITE_N8N_API_KEY;
        
        if (!this.apiKey) {
            console.warn('N8N API Key non définie. Certaines fonctionnalités pourraient ne pas fonctionner.');
        }

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: {
                'X-N8N-API-KEY': this.apiKey,
                'Content-Type': 'application/json'
            }
        });

        // Intercepteur pour la gestion des erreurs
        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                const errorMessage = this.handleError(error);
                return Promise.reject(new Error(errorMessage));
            }
        );
    }

    handleError(error) {
        if (error.response) {
            // Erreur avec réponse du serveur
            switch (error.response.status) {
                case 401:
                    return 'Authentification requise';
                case 403:
                    return 'Accès non autorisé';
                case 404:
                    return 'Ressource non trouvée';
                case 500:
                    return 'Erreur interne du serveur';
                default:
                    return `Erreur serveur: ${error.response.status}`;
            }
        } else if (error.request) {
            // Pas de réponse du serveur
            return 'Impossible de se connecter au serveur';
        } else {
            // Erreur lors de la configuration de la requête
            return `Erreur de configuration: ${error.message}`;
        }
    }

    async triggerWorkflow(workflowId, data = {}) {
        try {
            const response = await this.axiosInstance.post(`/webhook/${workflowId}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors du déclenchement du workflow: ${error.message}`);
        }
    }

    async getWorkflowStatus(workflowId) {
        try {
            const response = await this.axiosInstance.get(`/workflows/${workflowId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du statut du workflow: ${error.message}`);
        }
    }

    async executeWorkflow(workflowId, data = {}) {
        try {
            const response = await this.axiosInstance.post(`/workflows/${workflowId}/execute`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de l'exécution du workflow: ${error.message}`);
        }
    }
}

// Export d'une instance unique du service
export const n8nService = new N8nService(); 