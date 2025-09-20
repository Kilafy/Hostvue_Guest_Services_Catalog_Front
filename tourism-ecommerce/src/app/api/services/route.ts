import { NextRequest, NextResponse } from 'next/server';
import { createApiUrl, API_HEADERS, CORS_HEADERS, handleApiError } from '@/lib/api-routes';

export async function GET() {
  try {
    const response = await fetch(
      createApiUrl('/services'),
      {
        method: 'GET',
        headers: API_HEADERS,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch services: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: CORS_HEADERS,
    });
  } catch (error) {
    return handleApiError(error, 'Error proxying services request');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(
      createApiUrl('/services'),
      {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Service creation failed:', errorData);
      return NextResponse.json(
        { error: `Failed to create service: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 201,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    return handleApiError(error, 'Error creating service');
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}
