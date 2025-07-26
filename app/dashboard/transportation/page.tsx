"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/src/components/ui/data-table';
import { transportationApi } from '@/src/lib/api';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, MapPin, Bus, User, Route, Loader2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

interface TransportationRoute {
  id: string;
  route_name: string;
  route_code: string;
  description?: string;
  start_location: string;
  end_location: string;
  estimated_duration: number;
  distance_km?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TransportationBus {
  id: string;
  bus_number: string;
  license_plate: string;
  capacity: number;
  model?: string;
  year_manufactured?: number;
  fuel_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TransportationDriver {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  license_number: string;
  license_expiry: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TransportationPage() {
  const [activeTab, setActiveTab] = useState<'routes' | 'buses' | 'drivers'>('routes');
  const [routes, setRoutes] = useState<TransportationRoute[]>([]);
  const [buses, setBuses] = useState<TransportationBus[]>([]);
  const [drivers, setDrivers] = useState<TransportationDriver[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await transportationApi.getRoutes({
        page: 1,
        limit: 50,
        sort_by: 'route_name',
        sort_order: 'ASC'
      });
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch routes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await transportationApi.getBuses({
        page: 1,
        limit: 50,
        sort_by: 'bus_number',
        sort_order: 'ASC'
      });
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch buses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await transportationApi.getDrivers({
        page: 1,
        limit: 50,
        sort_by: 'first_name',
        sort_order: 'ASC'
      });
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch drivers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'routes') {
      fetchRoutes();
    } else if (activeTab === 'buses') {
      fetchBuses();
    } else if (activeTab === 'drivers') {
      fetchDrivers();
    }
  }, [activeTab]);

  const routeColumns: ColumnDef<TransportationRoute>[] = [
    {
      accessorKey: "route_code",
      header: "Route Code",
    },
    {
      accessorKey: "route_name",
      header: "Route Name",
    },
    {
      accessorKey: "start_location",
      header: "Start Location",
    },
    {
      accessorKey: "end_location",
      header: "End Location",
    },
    {
      accessorKey: "estimated_duration",
      header: "Duration",
      cell: ({ row }) => {
        const duration = row.getValue("estimated_duration") as number;
        return `${duration} min`;
      },
    },
    {
      accessorKey: "distance_km",
      header: "Distance",
      cell: ({ row }) => {
        const distance = row.getValue("distance_km") as number;
        return distance ? `${distance} km` : 'N/A';
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const route = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const busColumns: ColumnDef<TransportationBus>[] = [
    {
      accessorKey: "bus_number",
      header: "Bus Number",
    },
    {
      accessorKey: "license_plate",
      header: "License Plate",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: ({ row }) => {
        const capacity = row.getValue("capacity") as number;
        return `${capacity} seats`;
      },
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "fuel_type",
      header: "Fuel Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const bus = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const driverColumns: ColumnDef<TransportationDriver>[] = [
    {
      accessorKey: "employee_id",
      header: "Employee ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const driver = row.original;
        return `${driver.first_name} ${driver.last_name}`;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "license_number",
      header: "License Number",
    },
    {
      accessorKey: "license_expiry",
      header: "License Expiry",
      cell: ({ row }) => {
        const date = new Date(row.getValue("license_expiry"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "active" ? "default" : "outline"}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const driver = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium">Loading transportation data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportation</h1>
          <p className="text-muted-foreground">
            Manage school transportation routes, buses, and drivers.
          </p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab === 'routes' ? 'Route' : activeTab === 'buses' ? 'Bus' : 'Driver'}
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'routes' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('routes')}
        >
          <Route className="mr-2 h-4 w-4" />
          Routes
        </Button>
        <Button
          variant={activeTab === 'buses' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('buses')}
        >
          <Bus className="mr-2 h-4 w-4" />
          Buses
        </Button>
        <Button
          variant={activeTab === 'drivers' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('drivers')}
        >
          <User className="mr-2 h-4 w-4" />
          Drivers
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'routes' && (
        <Card>
          <CardHeader>
            <CardTitle>Transportation Routes</CardTitle>
            <CardDescription>
              Manage all transportation routes and their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={routeColumns}
              data={routes}
              searchKey="route_name"
              searchPlaceholder="Search routes..."
            />
          </CardContent>
        </Card>
      )}

      {activeTab === 'buses' && (
        <Card>
          <CardHeader>
            <CardTitle>School Buses</CardTitle>
            <CardDescription>
              Manage all school buses and their information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={busColumns}
              data={buses}
              searchKey="bus_number"
              searchPlaceholder="Search buses..."
            />
          </CardContent>
        </Card>
      )}

      {activeTab === 'drivers' && (
        <Card>
          <CardHeader>
            <CardTitle>Bus Drivers</CardTitle>
            <CardDescription>
              Manage all bus drivers and their information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={driverColumns}
              data={drivers}
              searchKey="name"
              searchPlaceholder="Search drivers..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
