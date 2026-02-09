"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Store, Bell, Shield, Database, Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">Configuration</p>
        <h1 className="font-serif text-3xl text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your store configuration</p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </motion.div>

      {/* Store Settings */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-foreground">Store Information</CardTitle>
                <CardDescription>Basic store details and branding</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Store Name</Label>
                <Input 
                  defaultValue="BIGO" 
                  className="bg-secondary border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Contact Email</Label>
                <Input 
                  defaultValue="hello@bigo.com.np" 
                  className="bg-secondary border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Phone Number</Label>
                <Input 
                  defaultValue="+977 1 4XXXXXX" 
                  className="bg-secondary border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Address</Label>
                <Input 
                  defaultValue="Thamel, Kathmandu, Nepal" 
                  className="bg-secondary border-border h-12"
                />
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-foreground">Notifications</CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">New Order Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when new orders come in</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert when products are running low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Daily Reports</Label>
                <p className="text-sm text-muted-foreground">Receive daily sales summary</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-foreground">Security</CardTitle>
                <CardDescription>Manage security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="border-border bg-transparent">
              Change Admin Password
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-foreground">Data Management</CardTitle>
                <CardDescription>Export and backup options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="border-border mr-4 bg-transparent">
              Export Orders
            </Button>
            <Button variant="outline" className="border-border mr-4 bg-transparent">
              Export Users
            </Button>
            <Button variant="outline" className="border-border bg-transparent">
              Backup Database
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
