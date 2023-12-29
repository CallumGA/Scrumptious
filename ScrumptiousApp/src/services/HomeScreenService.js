// src/services/HomeScreenService.js

const BASE_URL = 'http://127.0.0.1:5000'; // URL for iOS simulator

const HomeScreenService = {
  ping: async () => {
    try {
      const response = await fetch(`${BASE_URL}/ping`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during fetch operation:', error);
      throw error;
    }
  },
};

export default HomeScreenService;
