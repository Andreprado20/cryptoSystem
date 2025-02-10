"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import axios from "axios"
import { Button } from "react-native-elements"
import EntityForm from "./EntityForm"

const API_BASE_URL = "https://crypto-system-backend-kappa.vercel.app/api"

interface BaseScreenProps {
  entity: string
  displayFields: string[]
  formFields: string[]
}

const BaseScreen: React.FC<BaseScreenProps> = ({ entity, displayFields, formFields }) => {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/${entity}`)
      setData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      // You might want to use a toast library for React Native here
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (newFormData: any) => {
    setIsLoading(true)
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${entity}/${editId}`, newFormData)
      } else {
        await axios.post(`${API_BASE_URL}/${entity}`, newFormData)
      }
      fetchData()
      setIsDialogOpen(false)
      setFormData({})
      setIsEditing(false)
      setEditId(null)
    } catch (error) {
      console.error("Error submitting data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setIsLoading(true)
    try {
      await axios.delete(`${API_BASE_URL}/${entity}/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error deleting data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setIsEditing(true)
    setEditId(item.id)
    setIsDialogOpen(true)
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      {displayFields.map((field) => (
        <Text key={field} style={styles.cell}>
          {item[field]}
        </Text>
      ))}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              {displayFields.map((field) => (
                <Text key={field} style={styles.headerCell}>
                  {field}
                </Text>
              ))}
              <Text style={styles.headerCell}>Actions</Text>
            </View>
          )}
        />
      )}
      <EntityForm
        isVisible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialData={formData}
        isEditing={isEditing}
      />
      <Button
        title="Add New"
        onPress={() => {
          setFormData({})
          setIsEditing(false)
          setEditId(null)
          setIsDialogOpen(true)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionText: {
    color: "blue",
  },
})

export default BaseScreen

