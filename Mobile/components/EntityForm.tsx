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
            <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
            {field === "tipo" ? (
              <Picker
                selectedValue={formData[field]}
                onValueChange={(value) => handleChange(field, value)}
                style={styles.picker}
              >
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
                placeholder={`Enter ${field}`}
              />
            )}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onClose}
            type="outline"
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
          />
          <Button
            title={isEditing ? "Update" : "Create"}
            onPress={handleSubmit}
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitButtonText}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 32,
  },
  cancelButtonText: {
    color: "#000000",
  },
  submitButton: {
    backgroundColor: "#2892c3",
    borderRadius: 8,
    paddingHorizontal: 32,
  },
  submitButtonText: {
    color: "#ffffff",
  },
})

export default EntityForm

