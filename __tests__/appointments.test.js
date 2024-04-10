// Import the POST function to be tested
import { GET, POST, PUT } from '../src/app/api/appointments/route';

// Mock pool1 module
jest.mock('@/lib/database', () => ({
    pool1: {
        getConnection: jest.fn(),
    },
}));

// Mock NextResponse module
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

// Mock URL module
global.URL = jest.fn(() => ({
    searchParams: {
        get: jest.fn(),
    },
}));

describe('Appointments API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET function', () => {
        it('should fetch appointments from the database', async () => {
            // Mock request object
            const mockRequest = {
                url: 'http://example.com/appointments?page=1&action=search&column=appointmentType&searchValue=Checkup',
            };

            // Mock database connection
            const mockConnection = {
                execute: jest.fn().mockResolvedValue([[/* Mock rows from database */]]),
                release: jest.fn(),
            };

            const mockPool = require('@/lib/database');
            mockPool.pool1.getConnection.mockResolvedValue(mockConnection);

            // Execute the GET function
            await GET(mockRequest);

            // Assertions
            expect(mockPool.pool1.getConnection).toHaveBeenCalled();
            expect(mockConnection.execute).toHaveBeenCalled();
            expect(mockConnection.release).toHaveBeenCalled();
            expect(global.URL).toHaveBeenCalledWith(mockRequest.url);
        });

    });
    
    // describe('POST function', () => {
    //     it('should insert a new appointment into the database', async () => {
    //         // Mock appointment data
    //         const mockAppointmentData = {
    //             appointmentStatus: 'Scheduled',
    //             appointmentType: 'Checkup',
    //             timeQueued: '2024-04-10 12:00:00',
    //             queueDate: '2024-04-11',
    //             startTime: '2024-04-12 09:00:00',
    //             endTime: '2024-04-12 09:30:00',
    //             virtual: false,
    //             hospitalName: 'Hospital ABC',
    //             city: 'City XYZ',
    //             province: 'Province ABC',
    //             region: 'Region XYZ',
    //             doctorMainSpecialty: 'General Medicine',
    //             doctorAge: 40,
    //             patientAge: 30,
    //             patientGender: 'Male',
    //         };
    
    //         // Mock request object with appointment data
    //         const mockRequest = {
    //             json: jest.fn().mockResolvedValue(mockAppointmentData),
    //         };
    
    //         // Mock the appointment insertion operation
    //         const mockInsert = jest.fn().mockResolvedValue([[/* Mock insertion result */]]);
    
    //         // Execute the POST function with the mock request and mock insert function
    //         const response = await POST(mockRequest, mockInsert);
    
    //         // Verify that the POST function returns a defined value (indicating success)
    //         expect(response).toBeDefined();
    
    //         // Verify that the mock insert function is called with the appointment data
    //         expect(mockInsert).toHaveBeenCalledWith(mockAppointmentData);
    //     });
    // });

    describe('PUT function', () => {
        it('should update an existing appointment in the database', async () => {
            // Mock request object
            const mockRequest = {
                json: jest.fn().mockResolvedValue({
                    // Mock updated appointment data
                }),
            };

            // Mock database connection
            const mockConnection = {
                execute: jest.fn().mockResolvedValue([[/* Mock update result */]]),
                beginTransaction: jest.fn(),
                commit: jest.fn(),
                                rollback: jest.fn(),
                release: jest.fn(),
            };

            const mockPool = require('@/lib/database');
            mockPool.pool1.getConnection.mockResolvedValue(mockConnection);

            // Execute the PUT function
            await PUT(mockRequest);

            // Assertions
            expect(mockPool.pool1.getConnection).toHaveBeenCalled();
            expect(mockConnection.beginTransaction).toHaveBeenCalled();
            expect(mockConnection.execute).toHaveBeenCalled();
            expect(mockConnection.commit).toHaveBeenCalled();
            expect(mockConnection.release).toHaveBeenCalled();
            expect(mockRequest.json).toHaveBeenCalled();
        });

        // Additional test cases for different scenarios can be added here
    });
});
