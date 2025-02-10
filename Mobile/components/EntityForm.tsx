"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet, Modal } from "react-native"
import { Button } from "react-native-elements"
import { Picker } from "@react-native-picker/picker"

interface EntityFormProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  fields: string[]
  initialData: any
  isEditing: boolean
}

const EntityForm: React.FC<EntityFormProps> = ({ isVisible, onClose, onSubmit, fields, initialData, isEditing }) => {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{isEditing ? "Edit" : "Add New"}</Text>
        {fields.map((field) => (
          <View key={field} style={styles.fieldContainer}>
            <Text style={styles.label}>{field}</Text>
            {field === "tipo" && formData.tipo ? (
              <Picker selectedValue={formData[field]} onValueChange={(value) => handleChange(field, value)}>
                <Picker.Item label="Compra" value="compra" />
                <Picker.Item label="Venda" value="venda" />
                <Picker.Item label="Transferência" value="transferencia" />
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                value={formData[field] || ""}
                onChangeText={(value) => handleChange(field, value)}
                secureTextEntry={field === "senha"}
              />
            )}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} type="outline" />
          <Button title={isEditing ? "Update" : "Create"} onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
})

export default EntityForm

