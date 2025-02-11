import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface CardProps {
  data: Record<string, any>
  displayFields: string[]
  onEdit: () => void
  onDelete: () => void
}

const Card = ({ data, displayFields, onEdit, onDelete }: CardProps) => {
  return (
    <View style={styles.card}>
      {displayFields.map((field) => (
        <Text key={field} style={styles.field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}: {data[field]}
        </Text>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  field: {
    fontSize: 18,
    marginBottom: 8,
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  editButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  editButtonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#cf1010",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
})

export default Card

