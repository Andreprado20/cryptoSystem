"use client"

import React from "react"
import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { Button } from "react-native-elements"
import EntityForm from "./EntityForm"
import Card from "./Card"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { RefreshControl } from "react-native-gesture-handler"

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
  const [refreshing, setRefreshing] = useState(false)

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

  const onRefresh = React.useCallback(()=>{
    setRefreshing(true)
    setTimeout(()=>{
      setRefreshing(false)
    },1000)
    fetchData()
  },[])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {data.map((item) => (
            <Card
              key={item.id}
              data={item}
              displayFields={displayFields}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </ScrollView>
      )}
      <EntityForm
        isVisible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialData={formData}
        isEditing={isEditing}
      />
      <View style={styles.addButtonContainer}>
        <Button
          title="Add New"
          onPress={() => {
            setFormData({})
            setIsEditing(false)
            setEditId(null)
            setIsDialogOpen(true)
          }}
          buttonStyle={styles.addButton}
          titleStyle={styles.addButtonText}
        />
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#2892c3",
    borderRadius: 16,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
})

export default BaseScreen

