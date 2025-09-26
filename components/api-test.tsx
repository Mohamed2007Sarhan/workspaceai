"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { testAPI } from "@/lib/api-test"
import { CheckCircle, XCircle, Loader2, Server, Database, Users, Shield } from "lucide-react"

interface TestResult {
  health: boolean
  auth: { success: boolean; message: string }
  users: { success: boolean; message: string }
  teams: { success: boolean; message: string }
  permissions: { success: boolean; message: string }
}

export function APITest() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<TestResult | null>(null)

  const runTests = async () => {
    setLoading(true)
    try {
      const testResults = await testAPI()
      setResults(testResults)
    } catch (error) {
      console.error('Test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  const getStatusBadge = (success: boolean) => {
    return (
      <Badge variant={success ? "default" : "destructive"}>
        {success ? "Pass" : "Fail"}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            API Connection Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runTests} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              'Run API Tests'
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid gap-4">
          {/* Health Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Health Check
                </div>
                {getStatusBadge(results.health)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.health)}
                <span>{results.health ? 'API is healthy' : 'API is not responding'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication
                </div>
                {getStatusBadge(results.auth.success)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.auth.success)}
                <span>{results.auth.message}</span>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </div>
                {getStatusBadge(results.users.success)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.users.success)}
                <span>{results.users.message}</span>
              </div>
            </CardContent>
          </Card>

          {/* Team Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Management
                </div>
                {getStatusBadge(results.teams.success)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.teams.success)}
                <span>{results.teams.message}</span>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permissions
                </div>
                {getStatusBadge(results.permissions.success)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.permissions.success)}
                <span>{results.permissions.message}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
